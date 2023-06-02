import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ColorConfig } from "../../configs/colorConfigs";
import { setAppPallete, setAppState, setAppTitle } from "../../redux/features/appStateSlice";

type Props = {
  state?: string,
  title?: string,
  pallete?: ColorConfig,
  children: ReactNode;
};

const PageWrapper = (props: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.state) {
      dispatch(setAppState(props.state));
    }

    if(props.title) {
      dispatch(setAppTitle(props.title));
    }

    if(props.pallete) {
      dispatch(setAppPallete(props.pallete));
    }
  }, [dispatch, props]);

  return (
    <>{props.children}</>
  );
};

export default PageWrapper;