import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
  request: Request, 
) {
    try {
  const currentUser = await getCurrentUser();
 
  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { 
    id,
  title,
  description,
  imageSrc,
  createdAt,
  category,
  subCategory,
  status,
  saleStatus,
  minRoom,
  maxRoom,
  minBathroom,
  maxBathroom,
  minLevel,
  maxLevel,
  unitCount,
  constStartDate,
  constEndDate,
  applicationDate,
  applicationApprovalDate,
  companyName,
  companyCategory,
  companySubCategory,
  individualName,
  individualCategory,
  individualSubCategory,
  location,
  userId,
  minPrice,
  maxPrice,
  individualId,
  
  organizations,
   } = body;

  

  const listing = await prisma.listing.create({
    data: {
        id,
        title,
        description,
        imageSrc,
        createdAt,
        category,
        subCategory,
        status,
        saleStatus,
        minRoom,
        maxRoom,
        minBathroom,
        maxBathroom,
        minLevel,
        maxLevel,
        unitCount,
        constStartDate,
        constEndDate,
        applicationDate,
        applicationApprovalDate,
        companyName,
        companyCategory,
        companySubCategory,
        individualName,
        individualCategory,
        individualSubCategory,
        locationValue: location.value,
        userId: currentUser.id,
        minPrice,
        maxPrice,
        individualId,
        organizations
       
  
    }
  });


  return NextResponse.json(listing);
} catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.error();
  }
}