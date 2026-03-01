import tasksModel from "@/models/tasksModel";
import { connect } from "@/dbConfig/dbConfig"
connect();
import { NextResponse, NextRequest } from "next/server";
export async function POST(req: NextRequest,) {
  try {
    const {
      tasksName,
      description,
      priority,
      assignee,
      Status,
      department,
    }: any = await req.json();
    const tasks = await tasksModel.findOne({ tasksName })
    if (tasks) {
      return NextResponse.json({ error: "tasks already exists" }, { status: 400 });
    }
    const newtaskss = new tasksModel({
      tasksName,
      description,
      Status,
      priority,
      assignee,
      department
    })
    const savedtasks = await newtaskss.save();
    return NextResponse.json({
                message: "tasks created successfully",
                success: true,
                savedtasks
            })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
