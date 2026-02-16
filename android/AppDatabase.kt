
package com.roy.applocker.data

import androidx.room.*

@Entity(tableName = "locked_apps")
data class LockedApp(
    @PrimaryKey val packageName: String,
    val dateAdded: Long = System.currentTimeMillis()
)

@Entity(tableName = "intruder_logs")
data class IntruderLog(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val timestamp: Long,
    val imagePath: String,
    val attemptedPackage: String,
    val latitude: Double?,
    val longitude: Double?
)

@Dao
interface AppLockDao {
    @Query("SELECT * FROM locked_apps")
    suspend fun getAllLockedApps(): List<LockedApp>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun lockApp(app: LockedApp)

    @Delete
    suspend fun unlockApp(app: LockedApp)

    @Insert
    suspend fun insertIntruderLog(log: IntruderLog)
}

@Database(entities = [LockedApp::class, IntruderLog::class], version = 1)
abstract class AppDatabase : RoomDatabase() {
    abstract fun appLockDao(): AppLockDao
}
