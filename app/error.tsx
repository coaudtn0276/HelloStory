"use client";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div>
      <h4>다시시도 바랍니다.</h4>
      <button
        onClick={() => {
          reset();
        }}
      >
        다시시도
      </button>
    </div>
  );
}
