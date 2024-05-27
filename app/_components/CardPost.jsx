export default function CardPost ({title, content, authorId}) {
    return (
        <article name={authorId}>
            <h2>{title}</h2>
            <p>{content}</p>
        </article>
    )
}
