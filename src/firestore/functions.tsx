import {
  getDocs,
  collection,
  doc,
  deleteDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./setup";
import { ILeave } from "../pages/homepage";

// TODO (improve): Change this to have a class parametrised by the user profile

export const readLeaves = async (): Promise<ILeave[]> => {
  const userCollection = "aki";
  const data: ILeave[] = [];
  const collectionName = `profiles/${userCollection}/holidays`;
  const collectionRef = collection(db, collectionName);
  const docsSnapshot = await getDocs(collectionRef);
  if (docsSnapshot.empty) {
    console.log(`No documents in ${collectionName} collection`);
  }
  docsSnapshot.forEach((doc) => {
    const docData = doc.data();
    const r: ILeave = {
      uuid: docData.uuid,
      date: docData.date.toDate(),
      type: docData.type,
      approved: docData.approved,
      halfDay: docData.halfDay,
    };
    data.push(r);
  });
  return data;
};

export const addLeaveToDB = async (data: ILeave) => {
  const userCollection = "aki";
  const collectionName = `profiles/${userCollection}/holidays`;
  const ref = doc(db, collectionName, data.uuid);

  try {
    await setDoc(ref, data);
  } catch (err) {
    console.log("Error adding Leave");
    throw err;
  }
};

export const deleteLeaveFromDB = async (uuid: string) => {
  const userCollection = "aki";
  const collectionName = `profiles/${userCollection}/holidays`;
  const ref = doc(db, collectionName, uuid);
  console.log("delete ref", ref);
  try {
    await deleteDoc(ref);
  } catch (err) {
    console.log("Error deleting Leave");
    throw err;
  }
};

export const updateLeaveApprovalInDB = async (
  uuid: string,
  isApproved: boolean
) => {
  const userCollection = "aki";
  const collectionName = `profiles/${userCollection}/holidays`;
  const ref = doc(db, collectionName, uuid);

  try {
    await updateDoc(ref, { approved: isApproved });
  } catch (err) {
    console.log("Error updating Leave approval");
    throw err;
  }
};
