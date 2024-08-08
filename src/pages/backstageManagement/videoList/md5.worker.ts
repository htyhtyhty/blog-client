// import { getUploadDetail, merge } from 'src/api/modules/bigFile';
// import {getIdentityAndName, getChunkSize, packageTasks, getChunks, paralleTask} from './handle';
import SparkMD5 from 'spark-md5';

onmessage = async (event: any) => {
  const data = event.data;
  const { md5, suffix } = await getIdentityAndName(data);
  postMessage({ success: true, md5, suffix })
  // const res = await getUploadDetail({ md5, suffix });

  // if (!res.success) {
  //   postMessage({ success: false, message: '上传失败!' });
  //   return;
  // }

  // const { isUploaded, list } = res.data;
  // if (isUploaded) {
  //   postMessage({ success: true, message: '文件已上传过!' });
  //   return;
  // }

  // const size = getChunkSize(data.size as number);
  // const chunks = getChunks(data, size, md5, suffix, list);
  // const tasks = packageTasks(chunks);

  // postMessage({ success: true, message: '开始上传文件分片', totalChunks: chunks.length });

  // await paralleTask(tasks, 4);
  // await merge({ md5, suffix });
  // postMessage({ success: true, message: '上传成功!' });
};
export const getIdentityAndName = (file: any): { md5: string; suffix: string } => new Promise((resolve, reject) => {
    const suffix = file.name.split('.')[1];
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (e) => {
      const buffer = e.target?.result;
      const spark = new SparkMD5.ArrayBuffer();
      spark.append(buffer as ArrayBuffer);
      const md5 = spark.end();
      resolve({ md5, suffix });
    };
    fileReader.onerror = () => {
      fileReader.onerror = function (error) {
        reject(error);
      };
    };
  }) as any

export {};
