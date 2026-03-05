import { useEffect, useState } from "react";
import {
  getPosts,
  deletePost,
  restorePost
} from "../services/postService";


const MEDIA_BASE_URL = "/media/"; 


const platformIcons = {
  linkedin: "https://img.icons8.com/color/24/linkedin.png",
  instagram: "https://img.icons8.com/color/24/instagram-new--v1.png",
  youtube: "https://img.icons8.com/color/24/youtube-play.png",
  facebook: "https://img.icons8.com/color/24/facebook-new.png", // if you add facebook later
 
};

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const pageSize = 10;
  const totalPages = Math.ceil(count / pageSize);

  const loadPosts = async (pageNumber = 1) => {
    try {
      const res = await getPosts(pageNumber);
      console.log("Posts data:", res.data.results); // ← keep for debugging
      setPosts(res.data.results || []);
      setCount(res.data.count || 0);
    } catch (err) {
      console.error("Failed to load posts", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts(page);
  }, [page]);

  const handleDelete = async (postId) => {
    if (!window.confirm("Move post to recycle bin?")) return;
    try {
      await deletePost(postId);
      loadPosts(page);
    } catch {
      alert("Failed to delete post");
    }
  };

  const handleRestore = async (postId) => {
    try {
      await restorePost(postId);
      loadPosts(page);
    } catch {
      alert("Failed to restore post");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading posts...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Post Management</h1>
          <p className="text-sm text-gray-600 mt-1">
            Plan, review, and analyze your multi-channel marketing content.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 bg-white rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            Export CSV
          </button>
          <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
            + Create New Post
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard title="TOTAL POSTS" value={count} change="+12%" changeColor="text-green-600" />
        <StatCard
          title="SCHEDULED"
          value={posts.filter((p) => p.platforms?.some((pl) => pl.publish_status === "pending")).length}
          change="+5%"
          changeColor="text-green-600"
        />
        <StatCard title="AVG ENGAGEMENT" value="3.8%" change="+0.4%" changeColor="text-green-600" />
        <StatCard
          title="FAILED POSTS"
          value={posts.filter((p) => p.platforms?.some((pl) => pl.publish_status === "failed")).length}
          change="-2%"
          changeColor="text-red-600"
        />
      </div>

      {/* Search + Filters (unchanged) */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <input
          type="text"
          placeholder="Search by title, author, or keyword..."
          className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <div className="flex items-center gap-2 flex-wrap">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">Platform</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">Status</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">Date Range</button>
          <button className="text-blue-600 text-sm font-medium hover:underline">Clear All</button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-7 gap-4 px-6 py-3.5 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">
          <div>CHANNEL</div>
          <div className="col-span-2">CONTENT DETAILS</div>
          <div>PREVIEW</div>
          <div>STATUS</div>
          <div>SCHEDULE</div>
          <div>ENGAGEMENT</div>
        </div>

        <div className="divide-y divide-gray-200">
          {posts.map((post) => {
            const platform = post.platforms?.[0] || {};
            const media = platform.media?.[0];
            const provider = platform.provider?.toLowerCase() || "";

            return (
              <div
                key={post.id}
                className="grid grid-cols-7 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors items-center text-sm"
              >
                {/* CHANNEL → Logo instead of text */}
                <div className="flex items-center">
                  {platformIcons[provider] ? (
                    <img
                      src={platformIcons[provider]}
                      alt={provider}
                      className="w-6 h-6 object-contain"
                    />
                  ) : (
                    <span className="text-gray-500 capitalize">{provider || "—"}</span>
                  )}
                </div>

                {/* Content Details */}
                <div className="col-span-2">
                  <div className="font-medium text-gray-900">
                    {platform.caption?.slice(0, 60) || "Untitled Post"}
                    {platform.caption?.length > 60 ? "..." : ""}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    by {post.author || "Unknown"} • ID: {post.id}
                  </div>
                </div>

                {/* Preview – with MEDIA_BASE_URL fix */}
                <div className="flex items-center">
                  {media?.file ? (
                    media.media_type === "IMAGE" ? (
                      <img
                        src={`${MEDIA_BASE_URL}${media.file}`.replace(/\/+/g, "/")}
                        alt="preview"
                        className="w-16 h-12 object-cover rounded border border-gray-200"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/64x48?text=Img+Error";
                        }}
                      />
                    ) : media.media_type === "VIDEO" ? (
                      <video
                        src={`${MEDIA_BASE_URL}${media.file}`.replace(/\/+/g, "/")}
                        className="w-16 h-12 object-cover rounded"
                        muted
                        onError={(e) => {
                          e.target.outerHTML = '<div class="w-16 h-12 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-500">Video</div>';
                        }}
                      />
                    ) : null
                  ) : (
                    <div className="w-16 h-12 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-xs text-gray-500">
                      No media
                    </div>
                  )}
                </div>

                {/* Status – updated colors */}
                <div>
                  <StatusBadge status={platform.publish_status} />
                </div>

                {/* Schedule */}
                <div className="text-gray-700">
                  {platform.scheduled_time
                    ? new Date(platform.scheduled_time).toLocaleString([], {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "—"}
                </div>

                {/* Engagement + Actions */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">—</span>
                  <div className="flex gap-3 text-sm">
                    <button
                      onClick={() => setSelectedPost(post)}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </button>
                    {!post.is_deleted ? (
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRestore(post.id)}
                        className="text-green-600 hover:underline"
                      >
                        Restore
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination (unchanged) */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-4 border-t border-gray-200 bg-white text-sm text-gray-600">
          <p>
            Showing {(page - 1) * pageSize + 1} - {Math.min(page * pageSize, count)} of {count} results
          </p>
          <div className="flex items-center gap-2 mt-3 sm:mt-0">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1.5 border border-gray-300 rounded text-sm disabled:opacity-50 hover:bg-gray-50"
            >
              Previous
            </button>
            <span className="px-3 py-1.5 font-medium">{page}</span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1.5 border border-gray-300 rounded text-sm disabled:opacity-50 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {selectedPost && <PostDetailDrawer post={selectedPost} onClose={() => setSelectedPost(null)} />}
    </div>
  );
}

/* ──────────────────────────────────────────────── */

function StatCard({ title, value, change, changeColor }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">{title}</div>
      <div className="mt-2 flex items-baseline gap-2">
        <div className="text-2xl font-semibold text-gray-900">{value}</div>
        {change && <span className={`text-sm font-medium ${changeColor}`}>{change}</span>}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const base = "inline-flex px-2.5 py-1 rounded-full text-xs font-medium capitalize";

  const styles = {
    success: "bg-green-100 text-green-800 border border-green-200",
    published: "bg-green-100 text-green-800 border border-green-200",
    pending: "bg-blue-100 text-blue-800 border border-blue-200",
    processing: "bg-yellow-100 text-yellow-800 border border-yellow-200",
    failed: "bg-red-100 text-red-800 border border-red-200",
    draft: "bg-gray-100 text-gray-800 border border-gray-200",
  };

  const label = status ? status.charAt(0).toUpperCase() + status.slice(1) : "Draft";

  return (
    <span className={`${base} ${styles[status?.toLowerCase()] || "bg-gray-100 text-gray-800"}`}>
      {label}
    </span>
  );
}

function PostDetailDrawer({ post, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex justify-end">
      <div className="w-full max-w-md lg:max-w-lg bg-white h-full shadow-2xl overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Post Details</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
              ×
            </button>
          </div>

          {post.platforms?.map((platform) => (
            <div
              key={platform.id}
              className="border border-gray-200 rounded-lg p-5 mb-5 bg-gray-50/40"
            >
              <div className="font-semibold capitalize mb-1 flex items-center gap-2">
                {platformIcons[platform.provider?.toLowerCase()] && (
                  <img
                    src={platformIcons[platform.provider.toLowerCase()]}
                    alt={platform.provider}
                    className="w-5 h-5"
                  />
                )}
                {platform.provider || "Unknown"}
              </div>
              <div className="text-sm text-gray-500 mb-3">
                Status: <StatusBadge status={platform.publish_status} />
              </div>
              <div className="text-sm text-gray-800 whitespace-pre-line mb-4">
                {platform.caption || "No caption"}
              </div>

              {platform.media?.map((m) => (
                <div key={m.id} className="mb-4 rounded-lg overflow-hidden border border-gray-200">
                  {m.media_type === "IMAGE" && (
                    <img
                      src={`${MEDIA_BASE_URL}${m.file}`.replace(/\/+/g, "/")}
                      alt="media"
                      className="w-full h-auto"
                    />
                  )}
                  {m.media_type === "VIDEO" && (
                    <video
                      src={`${MEDIA_BASE_URL}${m.file}`.replace(/\/+/g, "/")}
                      controls
                      className="w-full h-auto"
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}