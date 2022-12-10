const Card = ({ data }) => {
  const { email, body, id } = data
  return (
    <>
      <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            <span className="text-black font-bold"> Id :</span> {id}
          </p>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          <span className="text-black font-bold">Email</span> {email}
        </p>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          <span className="text-black font-bold">Body</span> : {body}
        </p>
      </div>
    </>
  )
}

export default Card
