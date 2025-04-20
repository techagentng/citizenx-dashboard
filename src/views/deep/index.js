import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostPreviewById } from "services/userService"; // Adjust the import path as necessary

const PostPreviewPage = () => {
  const { id } = useParams();
  const [previewHtml, setPreviewHtml] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        const html = await getPostPreviewById(id);
        setPreviewHtml(html);
      } catch (err) {
        setPreviewHtml("<p style='text-align:center;color:red;'>Failed to load post preview.</p>");
      } finally {
        setLoading(false);
      }
    };

    fetchPreview();
  }, [id]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading preview...</p>;

  return (
    <div
      className="preview-wrapper"
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "auto",
      }}
      dangerouslySetInnerHTML={{ __html: previewHtml }}
    />
  );
};

export default PostPreviewPage;
