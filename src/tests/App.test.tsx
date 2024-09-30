import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe(App, async () => {
  test("初期レンダリングが正しく行われる", () => {
    render(<App />);

    expect(
      screen.getByPlaceholderText("ポケモンのIDを入力")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "ポケモンを見つける" })
    ).toBeInTheDocument();
  });

  test("ボタンクリックでデータがフェッチされ、画面に表示される", async () => {
    render(<App />);

    const user = userEvent.setup();
    const inputElement = screen.getByPlaceholderText("ポケモンのIDを入力");
    await user.type(inputElement, "25");

    const buttonElement = screen.getByRole("button", {
      name: "ポケモンを見つける",
    });
    await user.click(buttonElement);

    const pokemonName = screen.getByText("pikachu");
    expect(pokemonName).toBeInTheDocument();

    const pokemonImage = screen.getByRole("img");
    expect(pokemonImage).toHaveAttribute(
      "src",
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
    );
    expect(pokemonImage).toHaveAttribute("alt", "pikachu");
  });

  test("データ取得中にエラーが発生した場合に、エラーメッセージが表示される", async () => {
    render(<App />);

    const user = userEvent.setup();
    const inputElement = screen.getByPlaceholderText("ポケモンのIDを入力");
    await user.type(inputElement, "100000");

    const buttonElement = screen.getByRole("button", {
      name: "ポケモンを見つける",
    });
    await user.click(buttonElement);

    const pokemonName = screen.getByText("ポケモンのデータが見つかりません。");
    expect(pokemonName).toBeInTheDocument();
  });
});
