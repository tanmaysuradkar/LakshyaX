import projectModel from "@/models/projetsModel";
import { connect } from "@/dbConfig/dbConfig"
connect();
import { NextResponse, NextRequest } from "next/server";
export async function POST(req: NextRequest,) {
  try {
    const {
      projectName,
      Description,
      company,
      Role,
      Assignee,
      Status,
      TeamMembers,
      department,
    }: any = await req.json();
    const project = await projectModel.findOne({ projectName })
    if (project) {
      return NextResponse.json({ error: "project already exists" }, { status: 400 });
    }
    const newProjects = new projectModel({
      projectName,
      Description,
      company,
      Role,
      Assignee,
      Status,
      TeamMembers,
      department
    })
    const savedProject = await newProjects.save();
    return NextResponse.json({
                message: "project created successfully",
                success: true,
                savedProject
            })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
