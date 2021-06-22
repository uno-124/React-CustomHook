import "./styles.css";
import { UserCard } from "./components/UserCard";
import { useAllUsers } from "./hooks/useAllUsers";

export default function App() {
  const { getUsers, userProfiles, loading, error } = useAllUsers();

  const onClickFetchUser = () => getUsers();

  return (
    <div className="App">
      <button onClick={onClickFetchUser}>データ取得</button>
      <br />
      {error ? (
        // エラー発生時の画面処理
        <p style={{ color: "red" }}>データの取得に失敗しました。</p>
      ) : loading ? (
        // データ取得中の画面処理
        <p>Loading...</p>
      ) : (
        // データ取得後の画面処理
        <>
          {userProfiles.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </>
      )}
    </div>
  );
}
