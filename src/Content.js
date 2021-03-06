import './Content.css'

const welcome = (
	<section className='welcome'>
		<div className='description'>
			<p>
				Os dados utilizados nesse buscador são extraídos do{' '}
				<a
					href='https://dadosabertos.capes.gov.br/'
					target='_blank'
					rel='noopener noreferrer'
				>
					Portal de Dados Abertos da CAPES
				</a>{' '}
				e da{' '}
				<a
					href='https://sucupira.capes.gov.br/'
					target='_blank'
					rel='noopener noreferrer'
				>
					Plataforma Sucupira
				</a>
				. Escolha e pergunte sobre uma das categorias:
			</p>
		</div>

		<ul className='examples'>
			<li>Teses e dissertações</li>
			<li>Livros</li>
			<li>Artigos em revista</li>
			<li>Trabalho em Anais</li>
			<li>Dentre várias outras informações</li>
		</ul>
	</section>
)

const Results = ({ results }) => {
	const formatItem = (item, index) => {
		return (
			<>
				<h1>{item.title}</h1>
				{Object.entries(item).map(([key, value], subIndex) => {
					if (key !== 'title' && key !== 'link')
						return (
							<p
								className='content'
								key={`subitem-${index}-${subIndex}`}
							>
								<strong>{key}</strong>: <span>{value}</span>
							</p>
						)
					return ''
				})}
				{item?.link && (
					<a href={item.link} target='_blank' rel='noreferrer'>
						<i className='fas fa-external-link-alt'></i> Mais
						informações
					</a>
				)}
			</>
		)
	}

	const formatResults = () => {
		return (
			<section className='results'>
				{results.map((item, index) => {
					return (
						<article key={index} className='item'>
							{formatItem(item, index)}
						</article>
					)
				})}
			</section>
		)
	}

	return (
		<>
			{results.length > 0
				? formatResults()
				: 'Nenhum resultado encontrado para a busca solicitada.'}
		</>
	)
}

const Error = (error) => {
	return (
		<>
			<p>
				Ocorreu um erro ao se comunicar com o servidor, tente novamente
				mais tarde. Se o erro persistir, contate os desenvolvedores.
			</p>
			<div className='error'>
				<code>{String(error)}</code>
			</div>
		</>
	)
}

export const Content = ({ displayWelcome, results, isLoading, error }) => {
	return (
		<main>
			{displayWelcome ? (
				welcome
			) : isLoading ? (
				<p className='loading'>
					Consultando<span>.</span>
					<span>.</span>
					<span>.</span>
				</p>
			) : error ? (
				Error(error)
			) : (
				<>
					{results.length > 0 && (
						<small>
							{results.length}{' '}
							{results.length > 1
								? 'resultados encontrados'
								: 'resultado encontrado'}
						</small>
					)}
					<Results results={results} />{' '}
				</>
			)}
		</main>
	)
}
