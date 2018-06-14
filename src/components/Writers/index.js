import React, { Fragment } from "react";
import { Link, Route } from "react-router-dom";
import Writer from "./Writer";
import NotFound from "../Errors/404";

export default ({ match: { url }, writers }) => {
  return (
    <Fragment>
      <ul>
        {writers.map(({ id, name }) => (
          <li key={id}>
            <Link to={`${url}/${id}`}>{name}</Link>
          </li>
        ))}
      </ul>

      <Route
        exact
        path={url}
        render={() => <h3>Please select a writer from above</h3>}
      />

      <Route
        path={`${url}/:writerId`}
        render={({ match }) => {
          const writer = writers.find(
            writer => writer.id === match.params.writerId
          );

          if (!writer) {
            return <NotFound />;
          }
          return <Writer {...writer} />;
        }}
      />
    </Fragment>
  );
};
