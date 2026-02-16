
package com.roy.applocker

import android.app.Application
import dagger.hilt.android.HiltAndroidApp

@HiltAndroidApp
class RoyApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        // Initialize security monitors, crash reporting, etc.
        SecurityMonitor.init(this)
    }
}

object SecurityMonitor {
    fun init(app: Application) {
        // Initialize Root detection & Debugger prevention
        if (SecurityUtils.isDeviceRooted() || SecurityUtils.isDebuggerAttached()) {
            // Log security event or restrict app usage
        }
    }
}
