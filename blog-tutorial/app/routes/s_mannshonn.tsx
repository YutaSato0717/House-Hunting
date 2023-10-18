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
    const formData = await request.formData();
    const Mkagen = formData.get("Mkagen");//下限
    const Mjougen = formData.get("Mjougen");//上限
    const Mmadori = formData.get("Mmadori");//間取り
    const Mtikunen = formData.get("Mtikunen");//築年数
    const Mekikara = formData.get("Mekikara");//駅徒歩
    const Mtinryou = `${Mkagen}-${Mjougen}`;
    const M_tinryou = Number(Mtinryou)
    const M_tikunen = Number(Mtikunen)
    const M_ekikara = Number(Mekikara)

    if (typeof Mmadori !== "string" || Mmadori.length === 0) {
        return json(
          { errors: { Mmadori: "Mmadori is required", M_tikunen: null, M_ekikara: null} },
          { status: 400 },
        );
      }


  const mannsyon = await createProperty(userId,M_tinryou, Mmadori, M_tikunen, M_ekikara); 
};

export const meta: V2_MetaFunction = () => [{ title: "Sign Up" }];

export default function S_mannshon() {
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

      <div className="mx-auto w-full max-w-md px-8">
        <Form method="post" className="space-y-6">
            <h1 className="text-center text-2xl font-extrabold tracking-tight sm:text-8xl lg:text-2xl">
                <span className="block uppercase text-brock-500 drop-shadow-md letterspacing">
                新築マンション
                </span>
            </h1>
        <div>
            <label
              htmlFor="M_tinryou"
              className="block text-sm font-medium text-gray-700"
            >
              賃料
            </label>
            <div className="mt-1 grid grid-cols-3 gap-3">
              <input
                id="Mkagen"
                name="Mkagen"
                type="Mkagen"
                placeholder="下限"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
              <input
                id="Mjougen"
                name="Mjougen"
                type="Mjougen"
                placeholder="上限"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="Mmadori"
              className="block text-sm font-medium text-gray-700"
            >
              間取りを入力してください
            </label>
            <div className="mt-1">
              <input
                id="Mmadori"
                name="Mmadori"
                type="Mmadori"
                placeholder="間取りを入力してください"
                required
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
            </div>
          </div>
          
          <div>
            <label
              htmlFor="M_tikunen"
              className="block text-sm font-medium text-gray-700"
            >
              築年数
            </label>
            <div className="mt-1">
              <input
                id="M_tikunen"
                name="M_tikunen"
                type="M_tikunen"
                placeholder="築年数を入力してください"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="M_ekikatra"
              className="block text-sm font-medium text-gray-700"
            >
              駅徒歩
            </label>
            <div className="mt-1">
              <input
                id="M_ekikatra"
                name="M_ekikatra"
                type="M_ekikatra"
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
