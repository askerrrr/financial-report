import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";

var getFile = async (client, Key) => {
  var headObjCommand = new HeadObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key,
  });

  try {
    await client.send(headObjCommand);

    var getObjCommand = new GetObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key,
    });

    var signedUrl = await getSignedUrl(client, getObjCommand, {
      expiresIn: 300,
    });

    return { signedUrl };
  } catch (e) {
    return { signedUrl: null };
  }
};

export default getFile;
