<template>
  <div class="bg">
    <div class="main"></div>
    <h1 class="title">一人対戦</h1>
    <PrimaryButton
      :buttonText="'→AIとの対戦を開始する'"
      :to="'/playroomList'"
    ></PrimaryButton>
  </div>
</template>

<script>
// AIとの対戦ルームを作成する
const addSingleUserRoom = async () => {
  try {
    // レスポンスを取得
    const res = await $fetch("/api/singleUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    rooms.value.push(roomDomain);
  } catch (err) {
    // エラーハンドリング
    console.error(err);
  }
};
</script>
