
package com.roy.applocker.utils

import android.os.Debug
import java.io.File

object SecurityUtils {

    /**
     * Checks if the device is rooted by looking for known su binaries.
     */
    fun isDeviceRooted(): Boolean {
        val paths = arrayOf(
            "/system/app/Superuser.apk",
            "/sbin/su",
            "/system/bin/su",
            "/system/xbin/su",
            "/data/local/xbin/su",
            "/data/local/bin/su",
            "/system/sd/xbin/su",
            "/system/bin/failsafe/su",
            "/data/local/su"
        )
        for (path in paths) {
            if (File(path).exists()) return true
        }
        return false
    }

    /**
     * Detects if a debugger is currently attached to the process.
     */
    fun isDebuggerAttached(): Boolean {
        return Debug.isDebuggerConnected()
    }
}
