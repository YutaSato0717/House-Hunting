import type { MetaFunction } from "@remix-run/node";
import {Link} from "@remix-run/react";
import { useOptionalUser } from "~/utils";

export default function Index() {
  const user = useOptionalUser();
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
    
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <div className="relative sm:pb-16 sm:pt-8">
      <div className="text-center">
              <h4>おすすめの物件はこちらです。</h4>
          

          <Link
                className="text-blue-500 underline justify-center"
                to={{
                  pathname: "/jouken",
                  
                }}
              >
                別の条件で比較する
              </Link>
              </div>
        <div className="mx-auto max-10w-xl px-4 py-2 sm:px-6 lg:px-8">
          
          <div className="mt-8 flex flex-wrap justify-center gap-20">
          <Link
            to="/shouma">
          <img
          src="https://media.discordapp.net/attachments/1153877877025153064/1155795033748938782/2023-09-25_18.15.11.png?width=450&height=400"
          alt="Fly.io"
          width="300px"
          height="auto"
            />
            ショーマの家
        </Link>

        <Link
            to="/baki"> 
          <img
          src="https://chie-pctr.c.yimg.jp/dk/iwiz-chie/que-11223750721?w=999&h=999&up=0"
          alt="Fly.io"
          width="300px"
          height="auto"
            />
            刃牙の家
            </Link>

            <a href="https://fly.io">
            <img
            src="https://image.homes.jp/smallimg/image.php?file=https%3A%2F%2Fimg-dk.s3-ap-northeast-1.amazonaws.com%2Fimg%2Froom%2F3979%2F3979865%2F3979865_2.jpg&width=120&height=120"
            alt="Fly.io"
            width="300px"
            height="auto"
            />
            まおの家
            </a>  
           
            <a href="https://fly.io">
          <img
          src="https://image.homes.jp/smallimg/image.php?file=https%3A%2F%2Fimg-dk.s3-ap-northeast-1.amazonaws.com%2Fimg%2Froom%2F3979%2F3979865%2F3979865_2.jpg&width=120&height=120"
          alt="Fly.io"
          width="300px"
          height="auto"
            />
            よくわからんそこらへんの家
            </a>

            <a href="https://fly.io">
            <img
            src="https://image.homes.jp/smallimg/image.php?file=https%3A%2F%2Fimg-dk.s3-ap-northeast-1.amazonaws.com%2Fimg%2Froom%2F3979%2F3979865%2F3979865_2.jpg&width=120&height=120"
            alt="Fly.io"
            width="300px"
            height="auto"
            />
            ゆきとの家
            </a>  

           
            <Link
            to="/nobi"> 
            <img
            src="https://royal-juken.jp/wp/wp-content/uploads/2021/11/%E3%81%AE%E3%81%B2%E3%82%99%E5%A4%AA%E3%81%AE%E5%AE%B6.jpeg"
            alt="Fly.io"
            width="300px"
            height="auto"
            />
            のび太の家
            </Link>

            <a href="https://fly.io">
          <img
          src="https://image.homes.jp/smallimg/image.php?file=https%3A%2F%2Fimg-dk.s3-ap-northeast-1.amazonaws.com%2Fimg%2Froom%2F3979%2F3979865%2F3979865_2.jpg&width=120&height=120"
          alt="Fly.io"
          width="300px"
          height="auto"
            />
            </a>

            <a href="https://fly.io">
            <img
            src="https://image.homes.jp/smallimg/image.php?file=https%3A%2F%2Fimg-dk.s3-ap-northeast-1.amazonaws.com%2Fimg%2Froom%2F3979%2F3979865%2F3979865_2.jpg&width=120&height=120"
            alt="Fly.io"
            width="300px"
            height="auto"
            />
            </a>  
            <a href="https://fly.io">
            <img
            src="https://image.homes.jp/smallimg/image.php?file=https%3A%2F%2Fimg-dk.s3-ap-northeast-1.amazonaws.com%2Fimg%2Froom%2F3979%2F3979865%2F3979865_2.jpg&width=120&height=120"
            alt="Fly.io"
            width="300px"
            height="auto"
            />
            </a>  
          </div>
        </div>
      </div>
    </main>
  </div>
  );
}