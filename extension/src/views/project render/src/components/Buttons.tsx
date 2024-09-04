function Buttons({ content }: { content: string }) {
  return (
    <div className="px-4 py-2 text-white rounded-md bg-neutral w-fit">
      {content}
    </div>
  );
}

export default Buttons;
