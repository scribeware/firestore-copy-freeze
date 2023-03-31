const admin = require("firebase-admin");

const main = async () => {
  const credential = admin.credential.applicationDefault();
  const app = admin.initializeApp(
    {
      projectId: "scribeware5",
      credential,
      databaseURL: `https://scribeware5.firebaseio.com`,
    },
    "scribeware5"
  );

  const fromPath = "system/defaults/library";
  const docs = await app.firestore().collection(fromPath).listDocuments();
  console.log("docs.length", docs.length);

  for (const doc of docs) {
    const toPath = doc.path.replace(
      "system/defaults",
      "co/Iv3cRuEqz67WGSOBFWFh"
    );

    const docRef = await app.firestore().doc(doc.path).get();

    console.log(`Copying ${doc.path} to ${toPath}...`);
    await app.firestore().doc(toPath).set(docRef.data());
    console.log("done!", toPath);
  }
};

main()
  .then(() => console.log("done"))
  .catch(console.error);
