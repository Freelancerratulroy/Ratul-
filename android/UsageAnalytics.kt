
package com.roy.applocker.analytics

import android.app.usage.UsageStatsManager
import android.content.Context
import java.util.*

class UsageAnalytics(private val context: Context) {

    fun getDailyUsageMinutes(packageName: String): Long {
        val usageStatsManager = context.getSystemService(Context.USAGE_STATS_SERVICE) as UsageStatsManager
        val calendar = Calendar.getInstance()
        calendar.set(Calendar.HOUR_OF_DAY, 0)
        calendar.set(Calendar.MINUTE, 0)
        calendar.set(Calendar.SECOND, 0)
        
        val stats = usageStatsManager.queryAndAggregateUsageStats(calendar.timeInMillis, System.currentTimeMillis())
        val stat = stats[packageName]
        
        return (stat?.totalTimeInForeground ?: 0L) / (1000 * 60)
    }
}
