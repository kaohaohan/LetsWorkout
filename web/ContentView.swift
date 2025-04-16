import SwiftUI

struct ContentView: View {
    @State private var selectedTab = 0
    @State private var showingStartWorkout = false
    @StateObject private var dataManager = WorkoutDataManager()
    
    var body: some View {
        ZStack(alignment: .bottom) {
            TabView(selection: $selectedTab) {
                ProfileView()
                    .tag(0)
                    .tabItem {
                        Label("Profile", systemImage: "person")
                    }
                    .environmentObject(dataManager)
                
                HistoryView()
                    .tag(1)
                    .tabItem {
                        Label("History", systemImage: "clock")
                    }
                    .environmentObject(dataManager)
                
                // Center tab (placeholder for space)
                Color.clear
                    .tag(2)
                    .tabItem {
                        Label("", systemImage: "plus")
                    }
                
                ExerciseListView()
                    .tag(3)
                    .tabItem {
                        Label("Exercises", systemImage: "dumbbell")
                    }
                    .environmentObject(dataManager)
                
                UpgradeView()
                    .tag(4)
                    .tabItem {
                        Label("Upgrade", systemImage: "cart")
                    }
            }
            
            // Centered "Start Workout" button
            VStack {
                Spacer()
                Button(action: {
                    showingStartWorkout = true
                }) {
                    ZStack {
                        Circle()
                            .foregroundColor(.blue)
                            .frame(width: 60, height: 60)
                        Image(systemName: "plus")
                            .font(.system(size: 30))
                            .foregroundColor(.white)
                    }
                }
                .offset(y: -15) // Move up to overlap with TabBar
                Rectangle()
                    .fill(Color.clear)
                    .frame(height: 40) // Adjust for tab bar height
            }
        }
        .fullScreenCover(isPresented: $showingStartWorkout) {
            StartWorkoutView()
                .environmentObject(dataManager)
        }
    }
}

// 骨架結構
struct ProfileView: View {
    @EnvironmentObject var dataManager: WorkoutDataManager
    
    var body: some View {
        NavigationView {
            Text("Profile")
                .navigationTitle("Profile")
        }
    }
}

struct HistoryView: View {
    @EnvironmentObject var dataManager: WorkoutDataManager
    
    var body: some View {
        NavigationView {
            Text("History")
                .navigationTitle("History")
        }
    }
}

struct ExerciseListView: View {
    @EnvironmentObject var dataManager: WorkoutDataManager
    
    var body: some View {
        NavigationView {
            List(dataManager.exercises) { exercise in
                VStack(alignment: .leading) {
                    Text(exercise.name)
                        .font(.headline)
                    Text(exercise.category)
                        .font(.caption)
                        .foregroundColor(.secondary)
                }
            }
            .navigationTitle("Exercises")
        }
    }
}

struct UpgradeView: View {
    var body: some View {
        NavigationView {
            VStack {
                Text("Upgrade to Premium")
                    .font(.title)
                    .padding()
                
                Text("Get access to all features")
                    .foregroundColor(.secondary)
                
                Button(action: {
                    // 升級操作
                }) {
                    Text("Subscribe Now")
                        .fontWeight(.semibold)
                        .frame(width: 200)
                        .padding()
                        .background(Color.blue)
                        .foregroundColor(.white)
                        .cornerRadius(10)
                }
                .padding(.top, 20)
            }
            .navigationTitle("Upgrade")
        }
    }
}

#Preview {
    ContentView()
} 