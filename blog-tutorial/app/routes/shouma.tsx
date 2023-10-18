import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useOptionalUser } from "~/utils";


export default function Index() {
  const user = useOptionalUser();
  
  const images = [
    {
      src: "https://media.discordapp.net/attachments/1153877877025153064/1155795033748938782/2023-09-25_18.15.11.png?width=450&height=400",
      alt: "Fly.io",
    },
   
  ];

  return (
    <div>
    <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <h1 className="text-3xl font-bold">
            <Link
            to="/show"
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
        <a style={{ fontSize: "2rem"}}>物件情報</a>
        <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
          <div className="mt-6 flex-wrap justify-center gap-8">
            <a style={{ fontSize: "2rem", color: "red" }}>4.5万</a> 
            <a >/敷金: - 礼金: 4.5万円 保証金: - 敷引・償却: -</a>
            <br/>☆☆★★★
            {images.map((image, index) => (
              <img key={index} src={image.src} alt={image.alt} />
            ))}
            所在地：<a href="https://www.navitime.co.jp/address/07202006000/%E7%A6%8F%E5%B3%B6%E7%9C%8C%E4%BC%9A%E6%B4%A5%E8%8B%A5%E6%9D%BE%E5%B8%82%E4%B8%80%E7%AE%95%E7%94%BA%E5%A4%A7%E5%AD%97%E9%B6%B4%E8%B3%80%E5%A0%A4/">福島県会津若松市一箕町大字鶴賀堤</a>
            <br />駅徒歩：ＪＲ磐越西線/会津若松駅 歩40分
            <br/>間取り:1k 面積:7.5畳
            <br/>築年数:築30年 階:1階
          </div>
          <br/>
          <a style={{ fontSize: "2rem"}}>内見はこちらから</a>
          <div className="flex">
          <Link
            to="/posts"
            className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400 text-center"
            >
              掲示板へ
          </Link>
          </div>
        </div>
      </div>
    </main>
  </div>
  );
}