import { ClickCounter } from './ClickCounter';
import './hello.scss';

export const App = () => {
  return (
    <>
      <h1 className="container">Test Message to check webpack works</h1>
      <ClickCounter />
    </>
  );
};
