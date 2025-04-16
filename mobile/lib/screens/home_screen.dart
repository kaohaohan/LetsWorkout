import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/models/workout.dart';
import '../blocs/workout/workout_bloc.dart';
import '../blocs/workout/workout_event.dart';
import '../blocs/workout/workout_state.dart';
import 'workout_screen.dart';
import 'history_screen.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('LetsWorkout'), centerTitle: true),
      body: BlocConsumer<WorkoutBloc, WorkoutState>(
        listener: (context, state) {
          if (state is WorkoutStarted) {
            // 使用底部彈出視窗顯示訓練
            _showWorkoutBottomSheet(context, state.workout);
          } else if (state is WorkoutError) {
            // 錯誤處理
            ScaffoldMessenger.of(
              context,
            ).showSnackBar(SnackBar(content: Text(state.message)));
          }
        },
        builder: (context, state) {
          return Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                // 應用名稱和圖標
                const SizedBox(
                  height: 100,
                  child: Center(
                    child: Text(
                      'LetsWorkout',
                      style: TextStyle(
                        fontSize: 32,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ),

                const SizedBox(height: 32),

                // 開始空訓練按鈕
                ElevatedButton(
                  onPressed: () {
                    context.read<WorkoutBloc>().add(const StartWorkout());
                  },
                  style: ElevatedButton.styleFrom(
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    backgroundColor: Theme.of(context).primaryColor,
                  ),
                  child: const Text(
                    '開始空白訓練',
                    style: TextStyle(fontSize: 18, color: Colors.white),
                  ),
                ),

                const SizedBox(height: 16),

                // 創建計畫訓練按鈕
                OutlinedButton(
                  onPressed: () {
                    // TODO: 導航到計畫訓練頁面 (後續開發)
                  },
                  style: OutlinedButton.styleFrom(
                    padding: const EdgeInsets.symmetric(vertical: 16),
                  ),
                  child: const Text('創建計畫訓練', style: TextStyle(fontSize: 18)),
                ),

                const SizedBox(height: 32),

                // 訓練歷史按鈕
                TextButton(
                  onPressed: () {
                    context.read<WorkoutBloc>().add(LoadWorkoutHistory());
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => const HistoryScreen(),
                      ),
                    );
                  },
                  child: const Text('查看訓練歷史', style: TextStyle(fontSize: 16)),
                ),
              ],
            ),
          );
        },
      ),
    );
  }

  // 添加顯示訓練底部彈出視窗的方法
  void _showWorkoutBottomSheet(BuildContext context, Workout workout) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder:
          (context) => DraggableScrollableSheet(
            initialChildSize: 0.9,
            minChildSize: 0.5,
            maxChildSize: 0.95,
            builder:
                (context, scrollController) => Container(
                  decoration: const BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.vertical(
                      top: Radius.circular(20),
                    ),
                  ),
                  child: WorkoutScreen(workout: workout),
                ),
          ),
    );
  }
}
