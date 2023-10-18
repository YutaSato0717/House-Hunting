import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import { useEffect, useRef } from "react";

import { createUser, createProperty} from "~/models/user.server";
import { createUserSession, getUserId } from "~/session.server";
import { safeRedirect, validateEmail } from "~/utils";

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

export const action = async ({ request }: ActionArgs) => {
 //賃貸
  const formData = await request.formData();
  const Tkagen = formData.get("Tkagen");//下限
  const Tjougen = formData.get("Tjougen");//上限
  const Tmadori = formData.get("Tmadori");//間取り
  const Ttikunen = formData.get("Ttikunen");//築年数
  const Tekikara = formData.get("Tekikara");//駅徒歩
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/");
  const Ttinryou = `${Tkagen}-${Tjougen}`;
  const T_tinryou = Number(Ttinryou)
  const T_tikunen = Number(Ttikunen)
  const T_ekikara = Number(Tekikara)


  if (typeof Tmadori !== "string" || Tmadori.length === 0) {
    return json(
      { errors: { Tmadori: "Tmadori is required", T_tikunen: null, T_ekikara: null} },
      { status: 400 },
    );
  }


  const tintai = await createProperty(userId,T_tinryou, Tmadori, T_tikunen, T_ekikara); 
};

export const meta: V2_MetaFunction = () => [{ title: "Sign Up" }];

export default function Chintai() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? undefined;



  return (
    <div>
        <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
            <h1 className="text-3xl font-bold">
                <Link
                to="/jouken"
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
    <div className="flex min-h-full flex-col justify-center">
     {/* 賃貸のフィールド */} 
      <div className="mx-auto w-full max-w-md px-8">        
        <Form method="post" className="space-y-6">
            <h1 className="text-center text-2xl font-extrabold tracking-tight sm:text-8xl lg:text-2xl">
                <span className="block uppercase text-brock-500 drop-shadow-md letterspacing">
                賃貸物件
                </span>
            </h1>
        <div>
            <label
              htmlFor="T_tinryou"
              className="block text-sm font-medium text-gray-700"
            >
              賃料
            </label>
            <div className="mt-1 grid grid-cols-3 gap-3">
              <input
                id="Tkagen"
                name="Tkagen"
                type="Tkagen"
                placeholder="下限"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
              <input
                id="Tjougen"
                name="Tjougen"
                type="Tjougen"
                placeholder="上限"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="Tmadori"
              className="block text-sm font-medium text-gray-700"
            >
              間取りを入力してください
            </label>
            <div className="mt-1">
              <input
                id="Tmadori"
                name="Tmadori"
                type="Tmadori"
                placeholder="間取りを入力してください"
                required
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
            </div>
          </div>
          
          <div>
            <label
              htmlFor="T_tikunen"
              className="block text-sm font-medium text-gray-700"
            >
              築年数
            </label>
            <div className="mt-1">
              <input
                id="T_tikunen"
                name="T_tikunen"
                type="T_tikunen"
                placeholder="築年数を入力してください"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="T_ekikara"
              className="block text-sm font-medium text-gray-700"
            >
              駅徒歩
            </label>
            <div className="mt-1">
              <input
                id="T_ekikara"
                name="T_ekikara"
                type="T_ekikara"
                placeholder="駅徒歩を入力してください"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
            </div>
          </div>

          <div className="flex">
          <Link
            to="/show"
            className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400 text-center"
            >
              検索
          </Link>
          </div>
        </Form>
      </div>
     
      
      </div>
    </div>
  );
}
