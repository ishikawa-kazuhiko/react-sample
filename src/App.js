import { useState, useCallback, useMemo } from "react";
import "./styles.css";
import { ChildArea } from "./ChildArea";

export default function App() {
  console.log("App");
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  const onChangeText = (e) => setText(e.target.value);

  const onClickOpen = () => setOpen(!open);

  /**
   * `下記のアロー関数で書いた関数は、毎回新しい関数を生成していると判断される。
   * 従って、propsとしては、毎回違う関数として判断されるため、ChildAreaが毎回更新されてしまっている。（再レンダリング）
   *
   * ※useCallbackは同じものを使い回すということ。
   */

  const onClickClose = useCallback(() => setOpen(false), [setOpen]);

  /**
   * useMemoは、再レンダリングするたびに計算しなくてすむ
   * 複雑な計算のときに使用すると良い
   */
  const temp = useMemo(() => 1 + 3, []);
  console.log(temp);

  return (
    <div className="App">
      <input value={text} onChange={onChangeText} />
      <br />
      <br />
      <button onClick={onClickOpen}>表示</button>
      <ChildArea open={open} onClickClose={onClickClose} />
    </div>
  );
}
