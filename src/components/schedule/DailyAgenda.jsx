import { useEffect, useState } from "react";
import { getPosts } from "../../services/postService"; // adjust if needed

export default function DailyAgenda() {
  const [posts, setPosts] = useState([]);

  const today = new Date();

  const formatDate = today.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await getPosts(); // your API
        const allPosts = res.data.results || [];

        console.log(res.data.results);
        const todayPosts = allPosts.filter((post) => {
          return post.platforms?.some((p) => {
            if (!p.scheduled_time) return false;

            const date = new Date(p.scheduled_time);

            return (
              date.getDate() === today.getDate() &&
              date.getMonth() === today.getMonth() &&
              date.getFullYear() === today.getFullYear()
            );
          });
        });
        console.log(todayPosts);
        setPosts(todayPosts);
      } catch (err) {
        console.error("Failed to load posts", err);
      }
    }

    fetchPosts();
  }, []);

  return (
    <div className="h-full overflow-y-auto p-6 bg-transparent rounded-xl">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Daily Agenda</h2>
        <span className="text-xs text-gray-500">{formatDate}</span>
      </div>

      <p className="text-sm text-gray-500 mb-6">
        You have {posts.length} posts scheduled for today.
      </p>

      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="text-sm text-gray-400">No posts today</div>
        ) : (
          posts.map((post, i) =>
            post.platforms.map((p, idx) => {
              const date = new Date(p.scheduled_time);

              const time = date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <div
                  key={`${i}-${idx}`}
                  className="p-4 border border-gray-200 rounded-xl bg-gray-50"
                >
                  <div className="text-xs text-gray-500">{time}</div>
                  <div className="mt-1 font-medium text-gray-900">
                    {p.caption.slice(0,100) || "Untitled Post"}
                  </div>
                  <div className="flex gap-4">
                  <div className="text-xs text-blue-600 mt-1">
                    {p.publish_status}
                  </div>
                  <div className="flex text-xs justify-end text-blue-600 mt-1">
                    {p.provider.charAt(0).toUpperCase() + p.provider.slice(1)}
                  </div>

                  </div>
                </div>
              );
            }),
          )
        )}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-xl text-sm">
        <div className="font-semibold text-blue-700 mb-1">
          AI Optimization Tip
        </div>
        Posting at 11:30 AM typically sees 15% more engagement.
      </div>
    </div>
  );
}
