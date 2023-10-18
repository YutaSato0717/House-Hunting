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

//一軒家
  const Ikagen = formData.get("Ikagen");//下限
  const Ijougen = formData.get("Ijougen");//上限
  const Imadori = formData.get("Imadori");//間取り
  const Itikunen = formData.get("Itikunen");//築年数
  const Iekikara = formData.get("Iekikara");//駅徒歩
  const Itinryou = `${Ikagen}-${Ijougen}`;

  const I_tinryou = Number(Itinryou)
  const I_tikunen = Number(Itikunen)
  const I_ekikara = Number(Iekikara)

//マンション


  const M_tinryou = Number(Mtinryou)
  const M_tikunen = Number(Mtikunen)
  const M_ekikara = Number(Mekikara)

  if (typeof Tmadori !== "string" || Tmadori.length === 0) {
    return json(
      { errors: { Tmadori: "Tmadori is required", T_tikunen: null, T_ekikara: null} },
      { status: 400 },
    );
  }

  if (typeof Imadori !== "string" || Imadori.length === 0) {
    return json(
      { errors: { Imadori: "Imadori is required", I_tikunen: null, I_ekikara: null} },
      { status: 400 },
    );
  }

  if (typeof Mmadori !== "string" || Mmadori.length === 0) {
    return json(
      { errors: { Mmadori: "Mmadori is required", M_tikunen: null, M_ekikara: null} },
      { status: 400 },
    );
  }

  const tintai = await createProperty(userId,T_tinryou, Tmadori, T_tikunen, T_ekikara); 
  const ikkenya = await createProperty(userId,I_tinryou, Imadori, I_tikunen, I_ekikara);
  const mannsyon = await createProperty(userId,M_tinryou, Mmadori, M_tikunen, M_ekikara);
  
 





 
};


export const meta: V2_MetaFunction = () => [{ title: "Sign Up" }];

export default function Similar() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? undefined;



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
      
    <div className="flex min-h-full flex-col justify-center">
     {/* 賃貸のフィールド */} 
      <div className="mx-auto w-full max-w-md px-8">
        <Form method="post" className="space-y-6">
        <label

              htmlFor="T_tinryou"

              className="block text-sm font-medium text-gray-700 bg-yellow-200"
            >
              賃貸にお住みの方
            </label>
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
              htmlFor="T_ekikatra"
              className="block text-sm font-medium text-gray-700"
            >
              駅徒歩
            </label>
            <div className="mt-1">
              <input
                id="T_ekikatra"
                name="T_ekikatra"
                type="T_ekikatra"
                placeholder="駅徒歩を入力してください"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
            </div>
          </div>

          <input type="hidden" name="redirectTo" value={redirectTo} />
          <button
            type="submit"
            className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
          >
            登録
          </button>
        </Form>
      </div>
     
      {/* 一軒家のフィールド */} 
      <div className="mx-auto w-full max-w-md px-8">
        <Form method="post" className="space-y-6">
        <label
              htmlFor="I_tinryou"
              className="block text-sm font-medium text-gray-700 bg-yellow-200"
            >
              一軒家にお住みの方
            </label>
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

          <input type="hidden" name="redirectTo" value={redirectTo} />
          <button
            type="submit"
            className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
          >
            登録
          </button>
        </Form>
      </div>

     {/* マンションのフィールド */} 
      <div className="mx-auto w-full max-w-md px-8">
        <Form method="post" className="space-y-6">
        <label
              htmlFor="M_tinryou"
              className="block text-sm font-medium text-gray-700 bg-yellow-200"
            >
              マンションにお住みの方
            </label>
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
                name="MTkagen"
                type="MTkagen"
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
              htmlFor="M_ekikara"
              className="block text-sm font-medium text-gray-700"
            >
              駅徒歩
            </label>
            <div className="mt-1">
              <input
                id="M_ekikara"
                name="M_ekikara"
                type="M_ekikara"
                placeholder="駅徒歩を入力してください"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
            </div>
          </div>

          <input type="hidden" name="redirectTo" value={redirectTo} />
          <button
            type="submit"
            className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
          >
            登録
          </button>
        </Form>
      </div>
     
      {/* 一軒家のフィールド */} 
      <div className="mx-auto w-full max-w-md px-8">
        <Form method="post" className="space-y-6">
        <label
              htmlFor="Itinryou"
              className="block text-sm font-medium text-gray-700 bg-yellow-200"
            >
              一軒家にお住みの方
            </label>
        <div>
            <label
              htmlFor="Itinryou"
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
              htmlFor="Itikunen"
              className="block text-sm font-medium text-gray-700"
            >
              築年数
            </label>
            <div className="mt-1">
              <input
                id="Itikunen"
                name="Itikunen"
                type="Itikunen"
                placeholder="築年数を入力してください"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="Iekikatra"
              className="block text-sm font-medium text-gray-700"
            >
              駅徒歩
            </label>
            <div className="mt-1">
              <input
                id="Iekikatra"
                name="Iekikatra"
                type="Iekikatra"
                placeholder="駅徒歩を入力してください"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
            </div>
          </div>

          <input type="hidden" name="redirectTo" value={redirectTo} />
          <button
            type="submit"
            className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
          >
            登録
          </button>
        </Form>
      </div>

     {/* マンションのフィールド */} 
      <div className="mx-auto w-full max-w-md px-8">
        <Form method="post" className="space-y-6">
        <label
              htmlFor="Mtinryou"
              className="block text-sm font-medium text-gray-700 bg-yellow-200"
            >
              マンションにお住みの方
            </label>
        <div>
            <label
              htmlFor="Mtinryou"
              className="block text-sm font-medium text-gray-700"
            >
              賃料
            </label>
            <div className="mt-1 grid grid-cols-3 gap-3">
              <input
                id="Mkagen"
                name="MTkagen"
                type="MTkagen"
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
              htmlFor="Mtikunen"
              className="block text-sm font-medium text-gray-700"
            >
              築年数
            </label>
            <div className="mt-1">
              <input
                id="Mtikunen"
                name="Mtikunen"
                type="Mtikunen"
                placeholder="築年数を入力してください"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="Mekikatra"
              className="block text-sm font-medium text-gray-700"
            >
              駅徒歩
            </label>
            <div className="mt-1">
              <input
                id="Mekikatra"
                name="Mekikatra"
                type="Mekikatra"
                placeholder="駅徒歩を入力してください"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
            </div>
          </div>

          <input type="hidden" name="redirectTo" value={redirectTo} />
          <button
            type="submit"
            className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
          >
            登録
          </button>
        </Form>
      </div>
    </div>
  </div>
  );
}