interface Props {
  title: string;
  value: string;
  loading: boolean;
}

function TodayArticle({ title, value, loading }: Props) {
  return (
    <article className='p-4 rounded-xl  bg-neutral-800'>
      <h3 className='text-neutral-200'>{title}</h3>

      <p className='mt-4 text-2xl'>{loading ? '_' : value}</p>
    </article>
  );
}

export default TodayArticle;
