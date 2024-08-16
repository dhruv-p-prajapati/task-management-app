import { mongoInit } from '@/lib/db/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import User from '@/models/user.model';
import { IAPIResponse } from '@/types/APIResponse.types';
import { IUser } from '@/types/user.types';

mongoInit();

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json<IAPIResponse<null>>({
        success: false,
        data: null,
        message: 'User does not exists!',
        status: 400,
      });
    }

    if (user) {
      const isCorrectPass = await bcryptjs.compare(password, user.password!);

      if (isCorrectPass) {
        return NextResponse.json<IAPIResponse<IUser>>({
          success: true,
          data: user,
          message: 'User logged in successfully!',
          status: 400,
        });
      } else {
        return NextResponse.json<IAPIResponse<null>>({
          success: false,
          data: null,
          message: 'Password not match!',
          status: 400,
        });
      }
    }
  } catch (error: any) {
    console.log('Error :- ', error.message);
    return NextResponse.json<IAPIResponse<null>>({
      success: false,
      data: null,
      message: 'Internal server Error. Try again after some time',
      status: 500,
    });
  }
}
