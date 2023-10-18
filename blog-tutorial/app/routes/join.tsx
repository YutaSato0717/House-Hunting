import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import { useEffect, useRef } from "react";

import { createUser, getUserByEmail } from "~/models/user.server";
import { createUserSession, getUserId } from "~/session.server";
import { safeRedirect, validateEmail } from "~/utils";

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const year = formData.get("year"); // 新しい生年月日フィールド
  const month = formData.get("month");// 新しい生年月日フィールド
  const day = formData.get("day");// 新しい生年月日フィールド
  const gender = formData.get("gender");
  const street = formData.get("street"); // 新しい住所情報フィールド
  const city = formData.get("city"); // 新しい住所情報フィールド
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/");

  const birthdate = `${year}-${month}-${day}`;// 生年月日を適切な形式に変換

  if (!validateEmail(email)) {
    return json(
      { errors: { email: "Email is invalid", password: null } },
      { status: 400 },
    );
  }

  if (typeof password !== "string" || password.length === 0) {
    return json(
      { errors: { email: null, password: "Password is required" } },
      { status: 400 },
    );
  }

  if (password.length < 8) {
    return json(
      { errors: { email: null, password: "Password is too short" } },
      { status: 400 },
    );
  }

  if (typeof street !== "string" || street.length === 0) {
    return json(
      { errors: { email: null, password: null, street: "Street address is required", city: null } },
      { status: 400 },
    );
  }
//　追加したエラーコード

  if (typeof city !== "string" || city.length === 0) {
    return json(
      { errors: { email: null, password: null, street: null, city: "City is required" } },
      { status: 400 },
    );
  }
//　追加したエラーコード

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return json(
      {
        errors: {
          email: "A user already exists with this email",
          password: null,
          gender: null,
          street: null,// 追加したコード
          city: null,//　追加したコード
        },
      },
      { status: 400 },
    );
  }

  if (typeof gender !== "string" || gender.length === 0) {
    return json(
      { errors: { email: null, password: null, gender: "gender address is required"} },
      { status: 400 },
    );
  }

  const user = await createUser(email, password, birthdate, gender, street, city); // 住所情報を含むユーザーを作成

  return createUserSession({
    redirectTo,
    remember: false,
    request,
    userId: user.id,
  });
};

export const meta: V2_MetaFunction = () => [{ title: "Sign Up" }];

export default function Join() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? undefined;
  const actionData = useActionData<typeof action>();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <div className="flex min-h-full flex-col justify-center">
      <div className="mx-auto w-full max-w-md px-8">
        <Form method="post" className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                ref={emailRef}
                id="email"
                required
                autoFocus={true}
                name="email"
                type="email"
                placeholder="メールアドレスを入力してください"
                autoComplete="email"
                aria-invalid={actionData?.errors?.email ? true : undefined}
                aria-describedby="email-error"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
              {actionData?.errors?.email ? (
                <div className="pt-1 text-red-700" id="email-error">
                  {actionData.errors.email}
                </div>
              ) : null}
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              パスワード
            </label>
            <div className="mt-1">
              <input
                id="password"
                ref={passwordRef}
                name="password"
                type="password"
                placeholder="パスワードを入力してください"
                autoComplete="new-password"
                aria-invalid={actionData?.errors?.password ? true : undefined}
                aria-describedby="password-error"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
              {actionData?.errors?.password ? (
                <div className="pt-1 text-red-700" id="password-error">
                  {actionData.errors.password}
                </div>
              ) : null}
            </div>
          </div>
          
            {/* 生年月日のフィールド */}
          <div>
            <label
              htmlFor="birthdate"
              className="block text-sm font-medium text-gray-700"
            >
              生年月日
            </label>
            <div className="mt-1 grid grid-cols-3 gap-3">
              <input
                id="year"
                name="year"
                type="text"
                placeholder="YYYY"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
              <input
                id="month"
                name="month"
                type="text"
                placeholder="MM"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
              <input
                id="day"
                name="day"
                type="text"
                placeholder="DD"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
            </div>
          </div>    
          {/* 性別のフィールド */}      
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700"
            >
              性別
            </label>
            <div className="mt-1">
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    className="form-radio text-blue-500"
                  />
                  <span className="ml-2">男性</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    className="form-radio text-pink-500"
                  />
                  <span className="ml-2">女性</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    id="other"
                    name="gender"
                    value="other"
                    className="form-radio text-green-500"
                  />
                  <span className="ml-2">その他</span>
                </label>
              </div>
            </div>
          </div>

          {/* 住所情報フィールドの追加 */}
          <div>
            <label
              htmlFor="street"
              className="block text-sm font-medium text-gray-700"
            >
              郵便番号
            </label>
            <div className="mt-1">
              <input
                id="street"
                name="street"
                type="text"
                placeholder="郵便番号を入力してください"
                autoComplete="street-address"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
            </div>
          </div>
             
              {/* 住所情報フィールドの追加 */}  
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              住所
            </label>
            <div className="mt-1">
              <input
                id="city"
                name="city"
                type="text"
                placeholder="住所を入力してください"
                autoComplete="address-level2"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
            </div>
          </div>

          <input type="hidden" name="redirectTo" value={redirectTo} />
          <button
            type="submit"
            className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
          >
            アカウント作成
          </button>
          <div className="flex items-center justify-center">
            <div className="text-center text-sm text-gray-500">
              すでにアカウントを持っていますか?{" "}
              <Link
                className="text-blue-500 underline"
                to={{
                  pathname: "/login",
                  search: searchParams.toString(),
                }}
              >
                Log in
              </Link>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}