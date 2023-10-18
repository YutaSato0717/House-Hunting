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
    const Ikagen = formData.get("Ikagen");//下限
    const Ijougen = formData.get("Ijougen");//上限
    const Imadori = formData.get("Imadori");//間取り
    const Itikunen = formData.get("Itikunen");//築年数
    const Iekikara = formData.get("Iekikara");//駅徒歩
    const Itinryou = `${Ikagen}-${Ijougen}`;
    const I_tinryou = Number(Itinryou)
    const I_tikunen = Number(Itikunen)
    const I_ekikara = Number(Iekikara)

    if (typeof Imadori !== "string" || Imadori.length === 0) {
        return json(
          { errors: { Imadori: "Imadori is required", I_tikunen: null, I_ekikara: null} },
          { status: 400 },
        );
      }
    

      const ikkenya = await createProperty(userId,I_tinryou, Imadori, I_tikunen, I_ekikara);
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
                中古一戸建て
                </span>
            </h1>
            <div>
            <label
              htmlFor="I_tinryou"
              className="block text-sm font-medium text-gray-700"
            >
              賃料
            </label>
            <div className="mt-1 grid grid-cols-3 gap-3">
              <input
                id="Ikagen"
                name="ITkagen"
                type="ITkagen"
                placeholder="下限"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
              <input
                id="Ijougen"
                name="Ijougen"
                type="Ijougen"
                placeholder="上限"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="Imadori"
              className="block text-sm font-medium text-gray-700"
            >
              間取りを入力してください
            </label>
            <div className="mt-1">
              <input
                id="Imadori"
                name="Imadori"
                type="Imadori"
                placeholder="間取りを入力してください"
                required
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
            </div>
          </div>
          
          <div>
            <label
              htmlFor="I_tikunen"
              className="block text-sm font-medium text-gray-700"
            >
              築年数
            </label>
            <div className="mt-1">
              <input
                id="I_tikunen"
                name="I_tikunen"
                type="I_tikunen"
                placeholder="築年数を入力してください"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="I_ekikatra"
              className="block text-sm font-medium text-gray-700"
            >
              駅徒歩
            </label>
            <div className="mt-1">
              <input
                id="I_ekikatra"
                name="I_ekikatra"
                type="I_ekikatra"
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
  )
}  