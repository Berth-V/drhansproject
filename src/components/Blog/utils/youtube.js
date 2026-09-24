// Allows youtu.be/ID, youtube.com/watch?v=ID, youtube.com/embed/ID, youtube.com/shorts/ID, etc.
export const extractYoutubeId = (url) => {
    if (!url) return '';
    const match = url.match(
        /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|shorts\/|watch\?v=|watch\?.+&v=))([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : '';
};