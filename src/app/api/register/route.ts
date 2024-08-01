import { NextRequest, NextResponse } from 'next/server';
import { mongoInit } from '@/lib/db/dbConfig';
import User from '@/models/user.model';
import bcryptjs from 'bcryptjs';
import { IAPIResponse } from '@/types/APIResponse.types';

mongoInit();
export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    const existUser = await User.findOne({ email });

    if (existUser) {
      return NextResponse.json<IAPIResponse>({
        success: false,
        data: null,
        message: 'User already Exists',
        status: 400,
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new User({
      email,
      name,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json<IAPIResponse>({
      success: true,
      data: newUser,
      message: 'User Registered Successfully!!',
      status: 200,
    });
  } catch (error: any) {
    console.log('Error :- ', error.message);
    return NextResponse.json<IAPIResponse>({
      success: false,
      data: null,
      message: 'Internal server Error. Try again after some time',
      status: 500,
    });
  }
}
