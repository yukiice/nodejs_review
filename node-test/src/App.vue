<script setup lang="ts">
const uploadFile = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) {
    console.log('No file selected');
    return;
  }
  const formData = new FormData();
  formData.append('file', file);

  fetch('http://localhost:3000/request', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
}
</script>

<template>
  <div>
    <!-- 写一个上传组件 上传地址为3000 -->
    <input type="file" @change="uploadFile" />
  </div>
</template>

<style scoped></style>
