import axios from "axios";
import { useState } from "react";
import { UserProfile } from "../types/userProfile";
import { User } from "../types/api/user";

// カスタムフック化
// 関数名をuseXXXXXXとする(これはわかりやすいように命名しているだけ)
// 関数内でstateや処理を実行する関数を作成し、それを最後に呼び出し元に返却する

// 全ユーザーの一覧を取得するカスタムフック
export const useAllUsers = () => {
  const [userProfiles, setUserProfiles] = useState<Array<UserProfile>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getUsers = () => {
    setLoading(true);
    setError(false);

    axios
      .get<Array<User>>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const data = res.data.map((user) => ({
          id: user.id,
          name: `${user.name}(${user.username})`,
          email: user.email,
          address: `${user.address.city}${user.address.suite}${user.address.street}`
        }));
        setUserProfiles(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // カスタムフックで定義した関数やstateをオブジェクトで変換する。(配列でもいい)
  return { getUsers, userProfiles, loading, error };
};
