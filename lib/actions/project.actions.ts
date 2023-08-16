"use server";

import { revalidatePath } from "next/cache";

import { connectToDB } from "../mongoose";

import User from "../models/user.model";
import Project from "../models/project.model";
import Organization from "../models/organization.model";
import Thread from "../models/thread.model";

export async function fetchProjects(pageNumber = 1, pageSize = 20) {
  connectToDB();

  // Calculate the number of projects to skip based on the page number and page size.
  const skipAmount = (pageNumber - 1) * pageSize;

  // Create a query to fetch the projects that have no parent (top-level projects) (a project that is not a comment/reply).
  const projectsQuery = Project.find({ parentId: { $in: [null, undefined] } })
    .sort({ createdAt: "desc" })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({
      path: "author",
      model: User,
    })
    .populate({
      path: "organization",
      model: Organization,
    })
    .populate({
      path: "children", // Populate the children field
      populate: {
        path: "author", // Populate the author field within children
        model: User,
        select: "_id name parentId image", // Select only _id and username fields of the author
      },
    });

  // Count the total number of top-level projects (Projects) i.e., projects that are not comments.
  const totalProjectsCount = await Project.countDocuments({
    parentId: { $in: [null, undefined] },
  }); // Get the total count of projects

  const projects = await projectsQuery.exec();

  const isNext = totalProjectsCount > skipAmount + projects.length;

  return { projects, isNext };
}

interface Params {
  name: string,
  description: string,
  category: string,
  subCategory: string,
  author: string | null,
  organizationId: string | null,
  path: string,
}

export async function createProject({ name, description, category, subCategory, author, organizationId, path }: Params
) {
  try {
    connectToDB();

    const organizationIdObject = await Organization.findOne(
      { id: organizationId },
      { _id: 1 }
    );
    


    const createdProject = await Project.create({
      name,
      description,
      category, 
      subCategory,
      author,
      organization: organizationIdObject, // Assign organizationId if provided, or leave it null for personal account
    });

    // Update User model
    await User.findByIdAndUpdate(author, {
      $push: { projects: createdProject._id },
    });

    if (organizationIdObject) {
      // Update organization model
      await Organization.findByIdAndUpdate(organizationIdObject, {
        $push: { projects: createdProject._id },
      });
    }

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create project: ${error.message}`);
  }
}

async function fetchAllChildProjects(projectId: string): Promise<any[]> {
  const childProjects = await Project.find({ parentId: projectId });

  const descendantProjects = [];
  for (const childProject of childProjects) {
    const descendants = await fetchAllChildProjects(childProject._id);
    descendantProjects.push(childProject, ...descendants);
  }

  return descendantProjects;
}

export async function deleteProject(id: string, path: string): Promise<void> {
  try {
    connectToDB();

    // Find the project to be deleted (the main project)
    const mainProject = await Project.findById(id).populate("author organization");

    if (!mainProject) {
      throw new Error("Project not found");
    }

    // Fetch all child projects and their descendants recursively
    const descendantProjects = await fetchAllChildProjects(id);

    // Get all descendant Project IDs including the main project ID and child project IDs
    const descendantProjectIds = [
      id,
      ...descendantProjects.map((project) => project._id),
    ];

    // Extract the authorIds and OrganizationIds to update User and Organization models respectively
    const uniqueAuthorIds = new Set(
      [
        ...descendantProjects.map((project) => project.author?._id?.toString()), // Use optional chaining to handle possible undefined values
        mainProject.author?._id?.toString(),
      ].filter((id) => id !== undefined)
    );

    const uniqueOrganizationIds = new Set(
      [
        ...descendantProjects.map((project) => project.organization?._id?.toString()), // Use optional chaining to handle possible undefined values
        mainProject.organization?._id?.toString(),
      ].filter((id) => id !== undefined)
    );

    // Recursively delete child projects and their descendants
    await Project.deleteMany({ _id: { $in: descendantProjectIds } });

    // Update User model
    await User.updateMany(
      { _id: { $in: Array.from(uniqueAuthorIds) } },
      { $pull: { projects: { $in: descendantProjectIds } } }
    );

    // Update organization model
    await Organization.updateMany(
      { _id: { $in: Array.from(uniqueOrganizationIds) } },
      { $pull: { projects: { $in: descendantProjectIds } } }
    );

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to delete project: ${error.message}`);
  }
}

export async function fetchProjectById(projectId: string) {
  connectToDB();

  try {
    const project = await Project.findById(projectId)
      .populate({
        path: "author",
        model: User,
        select: "_id id name image",
      }) // Populate the author field with _id and username
      .populate({
        path: "organization",
        model: Organization,
        select: "_id id name image",
      }) // Populate the organization field with _id and name
      .populate({
        path: "children", // Populate the children field
        populate: [
          {
            path: "author", // Populate the author field within children
            model: User,
            select: "_id id name parentId image", // Select only _id and username fields of the author
          },
          {
            path: "children", // Populate the children field within children
            model: Project, // The model of the nested children (assuming it's the same "Project" model)
            populate: {
              path: "author", // Populate the author field within nested children
              model: User,
              select: "_id id name parentId image", // Select only _id and username fields of the author
            },
          },
        ],
      })
      .exec();

    return project;
  } catch (err) {
    console.error("Error while fetching project:", err);
    throw new Error("Unable to fetch project");
  }
}

export async function addCommentToProject(
  projectId: string,
  commentText: string,
  userId: string,
  path: string
) {
  connectToDB();

  try {
    // Find the original project by its ID
    const originalProject = await Project.findById(projectId);

    if (!originalProject) {
      throw new Error("Project not found");
    }

    // Create the new comment project
    const commentThread = new Thread({
      text: commentText,
      author: userId,
      parentId: projectId, // Set the parentId to the original project's ID
    });

    // Save the comment thread to the database
    const savedCommentThread = await commentThread.save();

    // Add the comment thread's ID to the original project's children array
    originalProject.children.push(savedCommentThread._id);

    // Save the updated original thread to the database
    await originalProject.save();

    revalidatePath(path);
  } catch (err) {
    console.error("Error while adding comment:", err);
    throw new Error("Unable to add comment");
  }
}