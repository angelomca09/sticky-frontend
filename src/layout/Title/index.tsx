import "./styles.css";
interface ITitleProps {
  title: string;
  subtitle?: string;
}

export const Title = ({ title, subtitle = "" }: ITitleProps) => {
  return (
    <div className='container title'>
      <hgroup >
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
      </hgroup>
    </div>
  )
}
