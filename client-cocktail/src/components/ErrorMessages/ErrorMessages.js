import React, {useEffect} from 'react'
import { map, isEmpty } from "lodash";

const ErrorMessages = ({error, errors, setError}) => {

    useEffect(() => {
        setError(errors);
      }, [errors, setError]);
    
      useEffect(() => {
        setError({});
      }, [setError]);

    return (
        <div>
              <p>
        {!isEmpty(error) &&
          map(Object.entries(error), ([value, keys]) => {
            return keys[0];
          })}
      </p>
        </div>
    )
}

export default ErrorMessages
