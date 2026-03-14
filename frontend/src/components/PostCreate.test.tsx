import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import PostCreate from "./PostCreate";

// 最小限のモック：Next.jsのHooksをモック
jest.mock("next-auth/react");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("PostCreate 初期表示テスト", () => {
  it("タイトルとフォームが正しく表示されていること", () => {
    // 1.モックの戻り値を設定（URLに ?country=Japan がある状態をシミュレート）
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => "Japan",
    });
    // 未ログイン状態
    (useSession as jest.Mock).mockReturnValue({ data: null });

    // 2.コンポーネントをレンダリング
    render(<PostCreate />);

    // 3.検証：画面内に特定のテキストがあるか確認
    expect(screen.getByText("投稿フォーム")).toBeInTheDocument();

    // 4.検証：input要素に "Japan" が入っている確認
    const countryInput = screen.getByDisplayValue("Japan");
    expect(countryInput).toBeInTheDocument();

    // 5.検証：プレースホルダーがあるか確認
    expect(screen.getByPlaceholderText("タイトル")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("投稿内容")).toBeInTheDocument();
  });
});
