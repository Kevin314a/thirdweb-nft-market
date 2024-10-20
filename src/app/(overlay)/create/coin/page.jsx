'use client'

export default function CreateCoinPage() {
  
  const formData = {
    name: '',
    ticker: '',
    description: '',
    twlink: '',
    tellink: '',
    website: '',
  };

  const handleSubmit = () => {
    
  };

  const handleChange = () => {

  };

  return (
    <div className="max-w-[1920px] flex-col md:flex-row mx-auto xl:px-10 px-5">
      <div className="mb-4 flex flex-col">
        <span className="text-2xl lg:text-4xl text-white text-center">Coin information</span>
      </div>
      <div className="w-full flex flex-row justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col"
        >
          <div className="mb-4 flex flex-col">
            <label className="block text-sm font-medium text-white mb-2">
              Name *
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="px-3 py-1 w-[50vw] min-w-[240px] max-w-[480px] text-white text-lg border-golden-1200 border-2 rounded-md bg-golden-1300 focus:outline-none focus:ring-golden-1200 focus:border-blue-500"
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label className="block text-sm font-medium text-white mb-2">
              Ticker *
            </label>
            <input
              type="text"
              name="ticker"
              id="ticker"
              value={formData.ticker}
              onChange={handleChange}
              className="px-3 py-1 w-[50vw] min-w-[240px] max-w-[480px] text-white text-lg border-golden-1200 border-2 rounded-md bg-golden-1300 focus:outline-none focus:ring-golden-1200 focus:border-blue-500"
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label className="block text-sm font-medium text-white mb-2">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="px-3 py-1 w-[50vw] min-w-[240px] max-w-[480px] text-white text-lg border-golden-1200 border-2 rounded-md bg-golden-1300 focus:outline-none focus:ring-golden-1200 focus:border-blue-500"
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label className="block text-sm font-medium text-white mb-2">
              twlink *
            </label>
            <input
              type="text"
              name="twlink"
              id="twlink"
              value={formData.twlink}
              onChange={handleChange}
              className="px-3 py-1 w-[50vw] min-w-[240px] max-w-[480px] text-white text-lg border-golden-1200 border-2 rounded-md bg-golden-1300 focus:outline-none focus:ring-golden-1200 focus:border-blue-500"
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label className="block text-sm font-medium text-white mb-2">
              tellink *
            </label>
            <input
              type="text"
              name="tellink"
              id="tellink"
              value={formData.tellink}
              onChange={handleChange}
              className="px-3 py-1 w-[50vw] min-w-[240px] max-w-[480px] text-white text-lg border-golden-1200 border-2 rounded-md bg-golden-1300 focus:outline-none focus:ring-golden-1200 focus:border-blue-500"
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label className="block text-sm font-medium text-white mb-2">
              Website
            </label>
            <input
              type="text"
              name="website"
              id="website"
              value={formData.website}
              onChange={handleChange}
              className="px-3 py-1 w-[50vw] min-w-[240px] max-w-[480px] text-white text-lg border-golden-1200 border-2 rounded-md bg-golden-1300 focus:outline-none focus:ring-golden-1200 focus:border-golden-1200"
            />
          </div>
          <button type="submit" className="mt-4 w-full py-2 bg-golden-1200 text-white rounded-md">
            Create Coin
          </button>
        </form>
      </div>
    </div>
  );
}