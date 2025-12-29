import projectModel from "@/models/projetsModel";
import { connect } from "@/dbConfig/dbConfig"
connect();
import { NextResponse, NextRequest } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const {
      projectName
    }:any = await req.json();
    const project = await projectModel.findOneAndDelete({ projectName })
    if (!project) {
      return NextResponse.json({ error: "project is not exists" }, { status: 400 });
    }
    
    return NextResponse.json({
                message: "project created successfully",
                success: true,
                project
            })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
