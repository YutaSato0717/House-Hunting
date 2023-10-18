import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useOptionalUser } from "~/utils";


export default function Index() {
  const user = useOptionalUser();
  
  const images = [
    {
      src: "https://royal-juken.jp/wp/wp-content/uploads/2021/11/%E3%81%AE%E3%81%B2%E3%82%99%E5%A4%AA%E3%81%AE%E5%AE%B6.jpeg",
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
            <a style={{ fontSize: "2rem", color: "red" }}>10万</a> 
            <a >/敷金:2万 礼金:- 保証金: - 敷引・償却: -</a>
            <br/>★★★★★
            {images.map((image, index) => (
              <img key={index} src={image.src} alt={image.alt} />
            ))}
            所在地：<a href="https://www.navitime.co.jp/address/07202071000/%E7%A6%8F%E5%B3%B6%E7%9C%8C%E4%BC%9A%E6%B4%A5%E8%8B%A5%E6%9D%BE%E5%B8%82%E7%99%BD%E8%99%8E%E7%94%BA/">福島県会津若松市白虎町</a>
            <br />駅徒歩：ＪＲ磐越西線/会津若松駅 車で15分
            <br/>間取り:3DK 面積:25.4坪
            <br/>築年数:築15年 階:1、2階
            <br/>建物種別:1戸建て
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