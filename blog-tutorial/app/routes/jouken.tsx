import type { V2_MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useOptionalUser } from "~/utils";
import React from 'react';

export const meta: V2_MetaFunction = () => [{ title: "Remix Notes" }];

const wideLetterSpacingStyle: React.CSSProperties = {
    letterSpacing: '4px', // 好みに応じて適切な値を設定
  };

export default function Index(){
  const user = useOptionalUser();
  return (
    <div>
        <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
            <h1 className="text-3xl font-bold">
                <Link
                to="/guest"
                className="rounded bg-slate-600 px-4 py-2 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
                >
                ←
                </Link>
            </h1>
            <a href="http://localhost:3000/guest">
            <img
                        src="https://media.discordapp.net/attachments/1153214251658399766/1155044709794856960/househuntingimage.png?width=942&height=936"
                        alt="Remix"
                        className="mt-3 ml-3 w-[3rem] md:w-[3rem] absolute top-0 right-2"
                        />
                </a>
        </header>
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <div className="relative sm:pb-16 sm:pt-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
            <div className="absolute inset-0">             
              <div className="absolute inset-0 bg-[color:rgba(254,204,27,0.5)] mix-blend-multiply" />
            </div>
            <div className="relative px-4 pb-8 pt-16 sm:px-6 sm:pb-14 sm:pt-24 lg:px-8 lg:pb-20 lg:pt-10">
              <h1 className="text-left text-6xl font-extrabold tracking-tight sm:text-2xl lg:text-3xl">
                <span className=" uppercase text-block-500 drop-shadow-md">
                  物件を選んでください
                </span>
              </h1>
              <div className="mt-7">
                    <h1 className="text-center text-2xl font-extrabold tracking-tight sm:text-8xl lg:text-2xl">
                     <span className="block uppercase text-brock-500 drop-shadow-md letterspacing">
                       借りる
                      </span>
                    </h1>
                    <div>
                    <h1 className="text-left text-2xl font-light tracking-tight sm:text-8xl lg:text-2xl">
                      <span className="block uppercase text-brock-500 drop-shadow-md letterspacing">
                       マンション・アパート・一戸建て
                      </span>                    
                    </h1>
                    </div>
            
                    <Link
                      to="/chinntai"
                      className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-10 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
                    >
                      賃貸物件
                    </Link>
                    <div className="mt-8">
                    <h1 className="text-center text-2xl font-extrabold tracking-tight sm:text-8xl lg:text-2xl">
                      <span className="block uppercase text-brock-500 drop-shadow-md letterspacing">
                       買う
                      </span>
                    </h1>
                    </div>
                    <div>
                    <h1 className="text-left text-2xl font-light tracking-tight sm:text-8xl lg:text-2xl">
                      <span className="block uppercase text-brock-500 drop-shadow-md letterspacing">
                       マンション
                      </span>
                    </h1>
                    </div>
                    <Link
                      to="/s_mannshonn"
                      className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-6 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8　button-spacing"
                    >
                      新築マンション
                    </Link>
                    <div className="mt-4">
                    <Link
                      to="/c_manshonn"
                      className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-6 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8 button-spacing"
                    >
                     中古マンション
                    </Link>
                    </div>
                    <div className="mt-8">
                    <h1 className="text-left text-2xl font-light tracking-tight sm:text-8xl lg:text-2xl">
                      <span className="block uppercase text-brock-500 drop-shadow-md">
                       一戸建て
                      </span>
                    </h1>
                    </div>
                    <Link
                      to="/s_ikko"
                      className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-6 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
                    >
                      新築一戸建て
                    </Link>
                    <div className="mt-4">
                    <Link
                      to="/c_ikko"
                      className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-6 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
                    >
                      中古一戸建て
                    </Link>
                    </div>
                  </div>
              </div>
              <a href="https://remix.run">
                <img
                  src="https://user-images.githubusercontent.com/1500684/158298926-e45dafff-3544-4b69-96d6-d3bcc33fc76a.svg"
                  alt="Remix"
                  className="mx-auto mt-16 w-full max-w-[12rem] md:max-w-[16rem]"
                />
              </a>
            </div>
          </div>
      </div>
    </main>
    </div>
  );
}