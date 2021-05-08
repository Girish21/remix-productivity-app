import { NavLink } from "react-router-dom";
import { Form } from "remix";
import { RouteDataType as TracksType } from "../routes";

type TodoTracksType = {
  tracks: TracksType;
};

const TrackForm = () => {
  return (
    <Form replace method="post">
      <label className="sr-only" htmlFor="track-name">
        Track name
      </label>
      <div className="flex items-center justify-between space-x-4">
        <div className="bg-white p-2 pb-1 rounded flex-shrink">
          <input
            name="track"
            id="track-name"
            placeholder="Track Name"
            autoComplete="off"
            className="w-full border-b-2 border-gray-300 placeholder-gray-700 placeholder-opacity-75 focus:outline-none focus:border-gray-500"
          />
        </div>
        <button
          className="py-2 px-4 flex-1 rounded-lg text-base bg-blue-500 text-white"
          type="submit"
        >
          Add
        </button>
      </div>
    </Form>
  );
};

export const TodoTracks = ({ tracks }: TodoTracksType) => {
  return (
    <nav className="flex flex-col p-4 bg-blue-100 col-start-1 col-end-2 space-y-2">
      {tracks.map(({ name, selectedCount, totalCount }) => (
        <NavLink
          key={name}
          to={name}
          end
          className="flex justify-between items-center no-underline w-full text-lg px-4 py-2 bg-gray-50 rounded uppercase"
          activeClassName="shadow-inner text-blue-400"
        >
          {name}
          <div className="flex items-center">
            {selectedCount} / {totalCount}
          </div>
        </NavLink>
      ))}
      <TrackForm />
    </nav>
  );
};
