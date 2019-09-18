import React, { useEffect, useState } from 'react';
import {
  InteractionManager,
  PermissionsAndroid,
  Permission,
  Rationale
} from 'react-native';

/**
 * React hook for handling Permission on android (ios always true)
 *
 * @param {Permission} permission following the android permissions, **IMPORTANT**: remember to include this permission on your `AndroidManifest.xml`
 * @param {Rationale} rationaleMessage (optional) mesage to show before prompting the user for the permission, usually explainig why do you require this permission
 *
 * @returns {boolean} permissonStatus
 */
export default function usePermission(permission, rationaleMessage = null) {
  const [permissionStatus, setPermissionStatus] = useState(false);

  useEffect(() => {
    const checkPermission = async () => {
      let result;

      if (Platform.OS === 'android') {
        result = await PermissionsAndroid.request(Permission, rationaleMessage);
      } else {
        result = 'granted';
      }
      setPermissionStatus(result === 'granted');
    };
    checkPermission();
  }, []);

  return permissionStatus;
}
