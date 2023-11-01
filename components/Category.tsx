export default function Category({ setSelectedTag, tag, selectedTag }) {
  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      return setSelectedTag(null);
    }
    return setSelectedTag(tag);
  };

  return (
    <div
      key={tag}
      onClick={() => handleTagClick(tag)}
      className={`${
        selectedTag === tag && 'ring-2 ring-gray-700 text-gray-700'
      } inline-flex items-center px-3 py-1.5 uppercase bg-zinc-900 rounded cursor-pointer dark:text-black dark:bg-white`}
    >
      <span className="text-sm font-bold uppercase text-white dark:text-black">{tag || 'All'}</span>
    </div>
  );
}
