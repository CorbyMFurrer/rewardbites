"use client";

import React, { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// TypeScript type for upload status
type UploadStatus = "IDLE" | "UPLOADING" | "UPLOADED" | "ERROR";

const FileUploadButton: React.FC = () => {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<any>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("IDLE");

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    getUser();
  }, [supabase]);

  const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    if (!user) {
      alert("No user logged in.");
      return;
    }

    setUploadStatus("UPLOADING");
    const filePath = `${user.id}_${new Date().getTime()}_${file.name}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("user_documents")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("UPLOAD ERROR", uploadError);
      setUploadStatus("ERROR");
      alert("Error during file upload. Check console for details.");
    } else {
      setUploadStatus("UPLOADED");
      alert("File uploaded successfully!");
    }
  };

  return (
    <div>
      {user ? (
        <>
          <input type="file" onChange={uploadFile} accept=".pdf, .docx" />
          {uploadStatus === "UPLOADING" && <p>Uploading...</p>}
          {uploadStatus === "UPLOADED" && <p>File uploaded successfully!</p>}
          {uploadStatus === "ERROR" && (
            <p>Error uploading file. Check console for details.</p>
          )}
        </>
      ) : (
        <p>Please log in to upload files.</p>
      )}
    </div>
  );
};

export default FileUploadButton;

/* THIS JUST WRITES TO DOCUMENT TABLE 
"use client";

import React, { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// TypeScript type for upload status
type UploadStatus = "IDLE" | "UPLOADING" | "UPLOADED" | "ERROR";

const FileUploadComponent: React.FC = () => {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<any>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("IDLE");

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    getUser();
  }, [supabase]);

  const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    if (
      !(
        file.type === "application/pdf" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      )
    ) {
      alert("Only PDF and DOCX files are supported.");
      return;
    }

    if (!user) {
      alert("No user logged in.");
      return;
    }

    setUploadStatus("UPLOADING");
    console.log("Simulating file upload for:", file.name);

    // Simulate file upload by directly inserting file details into the documents table
    const { data: insertData, error: insertError } = await supabase
      .from("documents")
      .insert([
        {
          user_id: user.id, // This is the UUID directly from auth.users table
          file_name: file.name,
          file_type: file.type,
          file_path: "simulated_path/" + file.name, // Simulated path
        },
      ]);

    if (insertError) {
      console.error("DATABASE INSERT ERROR", insertError);
      setUploadStatus("ERROR");
      alert("Failed to save document details. Check console for details.");
    } else {
      setUploadStatus("UPLOADED");
      alert("File details saved successfully!");
    }
  };

  return (
    <div>
      {user ? (
        <>
          <input type="file" onChange={uploadFile} accept=".pdf, .docx" />
          {uploadStatus === "UPLOADING" && <p>Uploading...</p>}
          {uploadStatus === "UPLOADED" && (
            <p>File details saved successfully!</p>
          )}
          {uploadStatus === "ERROR" && (
            <p>Error saving file details. Check console for details.</p>
          )}
        </>
      ) : (
        <p>Please log in to upload files.</p>
      )}
    </div>
  );
};

export default FileUploadComponent;

/** 
/* eslint-disable @next/next/no-img-element
"use client";

import React, { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// TypeScript type for upload status
type UploadStatus = "IDLE" | "UPLOADING" | "UPLOADED" | "ERROR";

const FileUploadComponent: React.FC = () => {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<any>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("IDLE");

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    getUser();
  }, [supabase]);

  const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    if (
      !(
        file.type === "application/pdf" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      )
    ) {
      alert("Only PDF and DOCX files are supported.");
      return;
    }

    if (!user) {
      alert("No user logged in.");
      return;
    }

    setUploadStatus("UPLOADING");
    const filePath = `${user.id}/${new Date().getTime()}_${file.name}`;
    console.log("Starting file upload for:", filePath);

    // Upload file to storage
    const { data: uploadData, error: uploadError } = await supabase.storage.from("user_documents").upload(filePath, file);

    if (uploadError) {
      console.error("UPLOAD ERROR", uploadError);
      setUploadStatus("ERROR");
      alert("Error during file upload. Check console for details.");
    } else {
      // Insert file details into documents table
      const { data: insertData, error: insertError } = await supabase
        .from("documents")
        .insert([
          {
            user_id: user.id, // This is the UUID directly from auth.users table
            file_name: file.name,
            file_type: file.type,
            file_path: filePath,
          },
        ]);

      if (insertError) {
        console.error("DATABASE INSERT ERROR", insertError);
        setUploadStatus("ERROR");
        alert("Failed to save document details. Check console for details.");
      } else {
        setUploadStatus("UPLOADED");
        alert("File uploaded and details saved successfully!");
      }
    }
  };

  return (
    <div>
      {user ? (
        <>
          <input type="file" onChange={uploadFile} accept=".pdf, .docx" />
          {uploadStatus === "UPLOADING" && <p>Uploading...</p>}
          {uploadStatus === "UPLOADED" && <p>File uploaded successfully!</p>}
          {uploadStatus === "ERROR" && (
            <p>Error uploading file. Check console for details.</p>
          )}
        </>
      ) : (
        <p>Please log in to upload files.</p>
      )}
    </div>
  );
};

export default FileUploadComponent;
*/
