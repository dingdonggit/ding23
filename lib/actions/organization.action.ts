"use server";

import { FilterQuery, SortOrder } from "mongoose";

import Organization from "../models/organization.model";
import Project from "../models/project.model";
import User from "../models/user.model";

import { connectToDB } from "../mongoose";

export async function createOrganization(
  id: string,
  name: string,
  username: string,
  image: string,
  bio: string,
  createdById: string // Change the parameter name to reflect it's an id
) {
  try {
    connectToDB();

    // Find the user with the provided unique id
    const user = await User.findOne({ id: createdById });

    if (!user) {
      throw new Error("User not found"); // Handle the case if the user with the id is not found
    }

    const newOrganization = new Organization({
      id,
      name,
      username,
      image,
      bio,
      createdBy: user._id, // Use the mongoose ID of the user
    });

    const createdOrganization = await newOrganization.save();

    // Update User model
    user.communities.push(createdOrganization._id);
    await user.save();

    return createdOrganization;
  } catch (error) {
    // Handle any errors
    console.error("Error creating organization:", error);
    throw error;
  }
}

export async function fetchOrganizationDetails(id: string) {
  try {
    connectToDB();

    const organizationDetails = await Organization.findOne({ id }).populate([
      "createdBy",
      {
        path: "members",
        model: User,
        select: "name username image _id id",
      },
    ]);

    return organizationDetails;
  } catch (error) {
    // Handle any errors
    console.error("Error fetching organization details:", error);
    throw error;
  }
}

export async function fetchOrganizationPosts(id: string) {
  try {
    connectToDB();

    const organizationPosts = await Organization.findById(id).populate({
      path: "projects",
      model: Project,
      populate: [
        {
          path: "author",
          model: User,
          select: "name image id", // Select the "name" and "_id" fields from the "User" model
        },
        {
          path: "children",
          model: Project,
          populate: {
            path: "author",
            model: User,
            select: "image _id", // Select the "name" and "_id" fields from the "User" model
          },
        },
      ],
    });

    return organizationPosts;
  } catch (error) {
    // Handle any errors
    console.error("Error fetching organization posts:", error);
    throw error;
  }
}

export async function fetchOrganizations({
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: {
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}) {
  try {
    connectToDB();

    // Calculate the number of organizations to skip based on the page number and page size.
    const skipAmount = (pageNumber - 1) * pageSize;

    // Create a case-insensitive regular expression for the provided search string.
    const regex = new RegExp(searchString, "i");

    // Create an initial query object to filter communities.
    const query: FilterQuery<typeof Organization> = {};

    // If the search string is not empty, add the $or operator to match either username or name fields.
    if (searchString.trim() !== "") {
      query.$or = [
        { username: { $regex: regex } },
        { name: { $regex: regex } },
      ];
    }

    // Define the sort options for the fetched communities based on createdAt field and provided sort order.
    const sortOptions = { createdAt: sortBy };

    // Create a query to fetch the communities based on the search and sort criteria.
    const organizationsQuery = Organization.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize)
      .populate("members");

    // Count the total number of communities that match the search criteria (without pagination).
    const totalOrganazationsCount = await Organization.countDocuments(query);

    const organizations = await organizationsQuery.exec();

    // Check if there are more communities beyond the current page.
    const isNext = totalOrganazationsCount > skipAmount + organizations.length;

    return { organizations, isNext };
  } catch (error) {
    console.error("Error fetching organizations:", error);
    throw error;
  }
}

export async function addMemberToOrganization(
  organizationId: string,
  memberId: string
) {
  try {
    connectToDB();

    // Find the organization by its unique id
    const organization = await Organization.findOne({ id: organizationId });

    if (!organization) {
      throw new Error("Organization not found");
    }

    // Find the user by their unique id
    const user = await User.findOne({ id: memberId });

    if (!user) {
      throw new Error("User not found");
    }

    // Check if the user is already a member of the organization
    if (organization.members.includes(user._id)) {
      throw new Error("User is already a member of the organization");
    }

    // Add the user's _id to the members array in the organization
    organization.members.push(user._id);
    await organization.save();

    // Add the organization's _id to the communities array in the user
    user.communities.push(organization._id);
    await user.save();

    return organization;
  } catch (error) {
    // Handle any errors
    console.error("Error adding member to organization:", error);
    throw error;
  }
}

export async function removeUserFromOrganization(
  userId: string,
  organizationId: string
) {
  try {
    connectToDB();

    const userIdObject = await User.findOne({ id: userId }, { _id: 1 });
    const organizationIdObject = await Organization.findOne(
      { id: organizationId },
      { _id: 1 }
    );

    if (!userIdObject) {
      throw new Error("User not found");
    }

    if (!organizationIdObject) {
      throw new Error("Organization not found");
    }

    // Remove the user's _id from the members array in the organization
    await Organization.updateOne(
      { _id: organizationIdObject._id },
      { $pull: { members: userIdObject._id } }
    );

    // Remove the organization's _id from the communities array in the user
    await User.updateOne(
      { _id: userIdObject._id },
      { $pull: { communities: organizationIdObject._id } }
    );

    return { success: true };
  } catch (error) {
    // Handle any errors
    console.error("Error removing user from organization:", error);
    throw error;
  }
}

export async function updateOrganizationInfo(
    organizationId: string,
  name: string,
  username: string,
  image: string
) {
  try {
    connectToDB();

    // Find the organization by its _id and update the information
    const updatedOrganization = await Organization.findOneAndUpdate(
      { id: organizationId },
      { name, username, image }
    );

    if (!updatedOrganization) {
      throw new Error("Organization not found");
    }

    return updatedOrganization;
  } catch (error) {
    // Handle any errors
    console.error("Error updating organization information:", error);
    throw error;
  }
}

export async function deleteOrganization(organizationId: string) {
  try {
    connectToDB();

    // Find the organization by its ID and delete it
    const deletedOrganization = await Organization.findOneAndDelete({
      id: organizationId,
    });

    if (!deletedOrganization) {
      throw new Error("Organization not found");
    }

    // Delete all projects associated with the organization
    await Project.deleteMany({ organization: organizationId });

    // Find all users who are part of the organization
    const organizationUsers = await User.find({ organizations: organizationId });

    // Remove the organization from the 'communities' array for each user
    const updateUserPromises = organizationUsers.map((user) => {
      user.organization.pull(organizationId);
      return user.save();
    });

    await Promise.all(updateUserPromises);

    return deletedOrganization;
  } catch (error) {
    console.error("Error deleting organization: ", error);
    throw error;
  }
}